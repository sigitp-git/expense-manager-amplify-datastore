const unixToString = (unixtimestamp) => {
  const dateObject = new Date(unixtimestamp)
  const stringTimeStamp = dateObject.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return stringTimeStamp
}

const unixToStringNoTime = (unixtimestamp) => {
  const dateObject = new Date(unixtimestamp)
  const stringTimeStamp = dateObject.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return stringTimeStamp
}

export { unixToStringNoTime, unixToString as default }
