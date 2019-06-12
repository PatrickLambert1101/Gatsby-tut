import React, { useState } from "react"
import styled from "styled-components"
const PersonStyle = styled.div`
  background-color: ${props => (props.bg ? "#c1c1c1" : "#f1f1f1")};
  padding: 10px;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  p {
    margin-bottom: 0;
  }
`
export default function({ person, deletePerson, index }) {
  const [showPerson, setShowPerson] = useState(false)

  return (
    <PersonStyle bg={showPerson} onClick={() => setShowPerson(!showPerson)}>
      <p>{person.name}</p>
      {showPerson && <p>Height: {person.height}cm</p>}
      <button onClick={e => deletePerson(e, person.name)}>Delete</button>
    </PersonStyle>
  )
}
