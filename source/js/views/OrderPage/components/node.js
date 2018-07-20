import React from 'react'


//getBeforeStyle - Based on the progress duration time, returns the style 
function getBeforeStyle(date1, date2, threshold, orderStatus) {
  
  if(getProgressDurationInMinutes(date1, date2) > threshold) {
    return {
      border : '3px solid #ff3b34',
      // background : '#ff3b34'
    }
  } else if (getProgressDurationInMinutes(date1, date2) === 0 && orderStatus === "force_redeemed") {
    return {
      border : '3px solid #4caf50'
    }
  } else if (getProgressDurationInMinutes(date1, date2) === 0) {
    return {
      border : '3px solid #dfdfdf'
    }
  } else {
    return {
      border : '3px solid #4caf50',
      // background : '#4caf50'
    }
  }
  
}

//getProgressDurationInMinutes - Returns the difference of given time in minutes
function getProgressDurationInMinutes(d1, d2) {

  const date1 = new Date(d1);
  const date2 = new Date(d2);
  let millisec, seconds, minutes = 0

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      minutes = seconds * ( 1/60 )
      minutes = minutes.toFixed(2)
  }

  return minutes;
}

const Node = ({date1, date2, threshold, orderStatus}) => {
  return (
    <span style={ 
      getBeforeStyle(date1, date2, threshold, orderStatus)
    } 
    className="before">
    </span>
  )
}

export default Node