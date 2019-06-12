import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Person from "../components/Person"
import styled from "styled-components"
const ImageWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
  grid-gap: 20px;
  margin-top: 30px;
  justify-content: center;
`
const PersonWrap = styled.div`
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 400px));
  grid-gap: 20px;
`
const IndexPage = ({ data }) => {
  const people = data.swapi.allPersons
  const images = data.allInstaNode.edges
  const [filteredPeople, setFilteredPeople] = useState(people)
  const filterPeople = e => {
    setFilteredPeople(
      people.filter(person =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }
  const deletePerson = (e, personName) => {
    e.stopPropagation()
    setFilteredPeople(
      filteredPeople.filter(person => person.name !== personName)
    )
  }
  return (
    <Layout>
      <input type="text" placeholder="search by name" onChange={filterPeople} />
      <PersonWrap>
        {filteredPeople.map((person, index) => (
          <Person key={index} person={person} deletePerson={deletePerson} />
        ))}
      </PersonWrap>
      <ImageWrap>
        {images.map(({ node }, index) => (
          <Img key={index} fluid={node.localFile.childImageSharp.fluid}></Img>
        ))}
      </ImageWrap>
    </Layout>
  )
}

export default IndexPage
export const query = graphql`
  query MyQuery {
    allInstaNode(limit: 10) {
      edges {
        node {
          localFile {
            childImageSharp {
              fluid(maxWidth: 200, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    swapi {
      allPersons(first: 30) {
        name
        height
        homeworld {
          name
        }
      }
    }
  }
`
