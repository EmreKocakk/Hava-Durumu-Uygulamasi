import React, { useState } from 'react'
import axios from 'axios'
import { FaLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";


function Weather() {

    const [value, setValue] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [speed, setSpeed] = useState("")
    const [temp, setTemp] = useState("")
    const [feels, setFeels] = useState("")
    const [pressure, setPressure] = useState("")
    const [humidity, setHumidity] = useState("")
    const [description, setDescription] = useState("")
    const API_KEY = "44207d22acee5cda0748d2d9f6fb0256"


    const getWeather = async () => {
        try {
            const res = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}&units=metric&lang=tr`)
            const { name, sys: { country }, wind: { speed }, main: { temp, feels_like, pressure, humidity }, weather: [{ description }] } = res.data
            setCity(name)
            setCountry(country)
            setSpeed(speed)
            setTemp(temp)
            setFeels(feels_like)
            setPressure(pressure)
            setHumidity(humidity)
            setDescription(description)
        } catch (error) {
            console.error('Hata alındı...', error)
        }
    }




    const date = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className='weather-wrap'>
            <div className="search">
                <input value={value} onChange={(e) => setValue(e.target.value)}
                    npmtype="text" placeholder='Hava Durumu Uygulaması...' />
                <FaSearch onClick={getWeather} className='icon' />
            </div>
            <div className="container">
                <div className='city'>
                    <p>{city}{country}</p><FaLocationDot />
                </div>
                <div className="date">
                    <p>{date}</p>
                </div>
                <div className="temp">
                    <CiTempHigh />
                    <p>{temp}°C</p>
                    <p>{description}</p>
                </div>
                <div className="detail">
                    <div className="press">
                        <p>Basınc</p>
                        <p>{pressure}hPa</p>
                    </div>
                    <div className="feels">
                        <p>Hissedilen</p>
                        <p>{feels}°C</p>
                    </div>
                    <div className="humidity">
                        <p>nem</p>
                        <p>%{humidity}</p>
                    </div>
                    <div className="wind">
                        <p>rüzgar</p>
                        <p>{speed}m/s</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather