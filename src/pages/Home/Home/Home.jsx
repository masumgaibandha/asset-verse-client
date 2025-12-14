import React from 'react'
import Banner from '../Banner/Banner'
import { Brand } from '../Brand/Brand'
import WorksCard from './WorksCard'
import OurServices from './OurServices'
import AssetHighlights from './AssetHighlights'

const Home = () => {
  return (
    <div className='py-5'>
        <Banner></Banner>
        <WorksCard></WorksCard>
        <OurServices></OurServices>
        <Brand></Brand>
        <AssetHighlights></AssetHighlights>
    </div>
  )
}

export default Home