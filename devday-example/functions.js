// Function Declaration
function speakers(speaker) {
  const talkFound = data.find(talk => {
    return talk.speaker === speaker
  })

  return talkFound
}

// Arrow Function
const speakers = speaker => {
  // Return implicito:
  const talkFound = data.find(talk => talk.speaker === speaker)

  // Return explicito:
  const talkFound = data.find(talk => {
    return talk.speaker === speaker
  })

  return talkFound
}
