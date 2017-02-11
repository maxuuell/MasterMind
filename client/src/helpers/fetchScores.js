export const fetchScores = (email) =>
  fetch(`/api/user/${email}/scores`, {
    method: "GET",
    headers: new Headers({'Content-Type': 'application/json'})
  })
