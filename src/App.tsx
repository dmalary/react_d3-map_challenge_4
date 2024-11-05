import './App.css'

import { numData } from '../data/numData'
import { geoData } from '../data/geoData'

import HexbinCholorpleth from '../components/HexbinCholorpleth'

function App() {

  const specs = { width: 900, height: 450 }

  return (
    <>
      <div className='copy'>
        <h1>What state has the most sports teams?</h1>
        <p>
          The following hexbin map shows the number of US sports teams, by state, among the 4 major leagues (NFL, NHL, MLB, NBA).
        </p>
        <p>Data from <a href="https://en.wikipedia.org/wiki/List_of_U.S._and_Canadian_cities_by_number_of_major_professional_sports_teams#Teams_by_state/province/district">Wikipedia</a>.</p>
      </div>
      <div className='legend'>
        <div className='has-sports'>Has sports teams</div>
        <div className='no-sports'>No sports teams</div>
      </div>
      <HexbinCholorpleth width={specs.width} height={specs.height} geoData={geoData} numData={numData}  />
    </>
  )
}

export default App
