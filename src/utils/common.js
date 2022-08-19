import React, { Fragment } from "react";
import { message } from "antd";
import { camelCase, capitalize, get, isEmpty, reduce, times } from "lodash";
import { CAR_STATUS_KEY, STATUS_DEALER, TYPE_USER } from "../consts/Enum";
import UIColor from "../colors";
import moment from "moment";
import { UploadService } from "../service";
import Urls from "../consts/Urls";

export function sagaWrapper(saga, errorHandle) {
  return function* (action) {
    try {
      yield saga(action);
    } catch (e) {
      yield errorHandle(e, action);
    }
  };
}

/**
 * Handle displaying errors in saga processes.
 * @param {err} object - callback async function* after show error message.
 */
export function errorHandler(
  err,
  action,
  itemStringKey,
  bypassErrorNotify = false
) {
  const errorMessage = parseErrorMessage(err);
  if (!bypassErrorNotify && errorMessage) {
    message.error({
      content: <Fragment>{errorMessage}</Fragment>,
      key: get(action, "type"),
      duration: 5,
    });
  }
}

export function parseErrorMessage(err) {
  if (!err.errors)
    return typeof err.message === "object" ? err?.message?.en : err.message;
  const result = Object.keys(err.errors).map(function (key, index) {
    return <p>{err.errors[key]}</p>;
  });

  return result;
}

/**
 * Handle displaying errors in saga processes.
 * @param {function} callback - callback async function* after show error message.
 * @param {string} itemStringKey - item string key to get item error message: (Ex: hotel, tour, order, group,...).
 */
export function sagaErrorHandler(
  callback,
  itemStringKey = "",
  bypassErrorNotify = false
) {
  return function* (e, action) {
    errorHandler(e, action, itemStringKey, bypassErrorNotify);
    console.warn(e);
    if (callback) {
      yield callback(e);
    }
  };
}

/**
 * Display success notifications in saga processes
 * @param {Object} [action] - saga action object.
 * @param {string} [message] - message to display.
 * @param {string} description - description to display as sub text bellow the message.
 */
export function sagaSuccessMessage({
  action,
  successMessage = null,
  description = null,
}) {
  if (action && successMessage === null && description === null) {
    successMessage = action.message;
    description = action.description;
    action = action.action;
  }
  return message.success({
    content: (
      <React.Fragment>
        <span>{successMessage}</span>
        {!!description && (
          <React.Fragment>
            <br />
            <div style={{ width: "100%", paddingLeft: 25, textAlign: "left" }}>
              <span style={{ fontStyle: "italic", fontSize: 10, opacity: 0.9 }}>
                {description}
              </span>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    ),
    key: action ? action.type : undefined,
    duration: 4,
  });
}

/**
 * Display loading notifications in saga processes
 * @param {Object} [action] - saga action object.
 * @param {string} [message] - message to display.
 */
export function sagaLoadingMessage(
  action,
  loadingMessage = null,
  duration = undefined
) {
  if (
    action &&
    typeof action.message === "string" &&
    loadingMessage === null &&
    duration === undefined
  ) {
    loadingMessage = action.message;
    duration = action.duration;
    action = action.action;
  }
  return message.loading({
    content: loadingMessage,
    key: action ? action.type : undefined,
    duration,
  });
}

export function formatCurrency(value) {
  return !!value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
}

export function removeKeyOjectValueEmpty(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === "all") {
      delete obj[key];
    }
  });
  return obj;
}

export function stringBoolean(data) {
  return data ? "Yes" : "No";
}

export function branchTwoArray(data = []) {
  if (isEmpty(data)) return [];
  const column = Math.round(data.length / 2);

  const arrayFirst = [];
  const arraySecond = [];

  for (let i = 0; i < column; i++) {
    arrayFirst.push({ value: data[i]?.name || "" });
  }

  for (let j = column; j < data.length; j++) {
    arraySecond.push({ value: data[j]?.name || "" });
  }

  return [arrayFirst, arraySecond];
}

export function detectUrlString(string) {
  return /^(http|https):\/\/.*/.test(string);
}

export function parseListStatusCar(data) {
  if (isEmpty(data)) return [];
  let totalAll = 0;
  const result = [];
  for (const [key, value] of Object.entries(data[0])) {
    totalAll += value;
    result.push({
      label: capitalize(key),
      count: value,
      key: CAR_STATUS_KEY[key],
      color: UIColor.status[camelCase(key)],
    });
  }
  result.unshift({
    label: "All Cars",
    count: totalAll,
    key: "all",
  });
  return result;
}

export function dataSelectYear(year) {
  const d = new Date();
  let currentYear = d.getFullYear();
  const result = [];
  for (let i = year; i <= currentYear; i++) {
    result.push({
      name: `${i}`,
      key: i,
    });
  }
  return result;
}

export function parseSelect(data, keyName = "name", keyCode = "code") {
  if (isEmpty(data)) return [];
  const result = data.map((item) => {
    const name = item[keyName];
    const key = item[keyCode];
    const id = item._id;
    return { name, key, id };
  });
  return result;
}

export function parseFeature(data, dataIcon) {
  if (isEmpty(data)) return [];
  const newData = [...data];
  newData.forEach((item, idx) => {
    item.icon = dataIcon.find((el) => el.name === item.name).icon;
  });
  return newData;
}

export function parseListCode(data) {
  if (isEmpty(data)) return [];
  const ids = data.map((item) => item.code);
  return ids;
}

export function parseDateColumnTable(date) {
  return date ? `${moment(date).format("DD")} ${moment(date).format("MMM")} ${moment(
    date
  ).format("YYYY")}` : "-";
}

export async function promiseUpload(code, type, files) {
  const promiseAll = (files || []).map(async (item) => {
    return await UploadService.UPLOAD_FILE(
      {
        refCode: code,
        refType: type,
      },
      item.originFileObj
    );
  });
  const result = await Promise.all(promiseAll);
  // const urls = result.map(
  //   (item) => Urls.URL_FILE + item.result.fileAdded.path.origin
  // );
  // return urls;
}

export function disabledActionCar(status) {
  return status === CAR_STATUS_KEY.BOOKED || status === CAR_STATUS_KEY.SOLD;
}

export function nameButtonActionCar(status) {
  return status === CAR_STATUS_KEY.DRAFT ? "PUBLISH" : "Unpublish";
}

export function parseListImage(images) {
  if (!images && !images?.length) return [];
  const result = images.map((item) => {
    if (item.originFileObj || item.url) {
      return item;
    } else {
      const uid = item._id;
      const name = `${item.refCode}-${item._id}`;
      const url = Urls.URL_FILE + item?.path?.origin;
      const status = "done";
      return { uid, name, url, status };
    }
  });
  return result;
}

export function listImageURL(images) {
  if (!images && !images?.length) return [];
  const result = images.map((item) => {
    return Urls.URL_FILE + item.path.origin;
  });
  return result;
}

export function textEmpty(text){
  return text ? text : "-"
}

export function statusDeadler(merchantData){
  if(merchantData){
    if(merchantData.approved) return STATUS_DEALER.AVAILABLE
    if(merchantData.rejected) return STATUS_DEALER.STORE_REJECTED
    return STATUS_DEALER.RESQUESTING_STORE
  }
  return STATUS_DEALER.NEW
}

export function totalCount(data){
  const result =  reduce(data, function(sum, item) {
    return sum + item.count;
  }, 0);
  return result;
}

export function nameCar(item){
  return !isEmpty(item) ? item.year + " " + item?.brand?.name + " " + item?.engine?.name + " " + item?.variant?.name + " " + item?.seatingCapacity?.name : "-"
}

export function validateIsBorderBottom(length, index){
  if(length % 2 === 0){
    return index < length - 2;
  }else{
    return index < length - 1 ;
  }
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = (number) => {
    return number > 1 ? 's' : '';
  };
  const number = (num) => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export function compare( a, b ) {
  if ( new Date(a.created).getTime() < new Date(b.created).getTime() ){
    return -1;
  }
  if ( new Date(a.created).getTime() > new Date(b.created).getTime() ){
    return 1;
  }
  return 0;
}

export function urlListOrder(key){
  switch(key){
    case TYPE_USER.ADMIN:{
      return Urls.ORDER_LIST_ADMIN
    }
    case TYPE_USER.DEALER:{
      return Urls.ORDER_LIST_DEALER
    }
    case TYPE_USER.SUPPLIER: {
      return Urls.ORDER_LIST_SUPPLIER
    }
    default:{
      return Urls.ORDER_LIST_DEALER
    }
  }
}