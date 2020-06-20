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

export default unixToString