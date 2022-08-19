import React, { useState } from 'react'

function useVisibleDropdown(){
    const [visible, setVisiblle] = useState(false);

    return [ visible, ]
}

export { useVisibleDropdown }