import React from 'react'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { HomeBanner } from './HomeBanner'
import { HomeCall } from './HomeCall'
import { HomeCommercial } from './HomeCommercial'
import { HomeServices } from './HomeServices'

export const HomeScreen = () => {
    return (
        <>
            <Hero />
            <HomeCall />
            <HomeServices />
            <HomeBanner />
            <HomeCommercial />
            <Footer />
        </>
    )
}
