import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import Starrating from '../components/Starrating';


const RoomDetails = () => {
    const {id}= useParams();
    const [room,setRoom]=useState(null);
    const[mainImage,setMainImage]=useState(null);

    useEffect(()=>{
      const roomData=  roomsDummyData.find((room=>room._id==id))
      console.log(roomData)
      roomData&&setRoom(roomData)

      roomData&&setMainImage(roomData.images[0])
    },[])
  return room&& (
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
        <h1 className='text-3xl md:text-4xl font-playfair '>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
        <p className='text-xs font inter py-1.5 px-3 text-white bg-orange-500 rounded-full '>20% OFF</p>
      </div>
      <div className='flex items-center gap-1 mt-2'>
        <Starrating/>
        <p className='ml-2'>200+ Reviews</p>
      </div>
      <div className='flex items-center gap-1 text-gray-500 mt-2'>
        <img src={assets.locationIcon} alt="loction-icon" />
        <span>{room.hotel.address}</span>
      </div>
      <div className='flex flex-col lg:flex-row mt-6 gap-6'>
        <div className='lg:w-1/2 w-full'>
            <img className='w-full rounded-xl shadow-lg object-cover' src={mainImage} alt="main" />
        </div>
        <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full '>
            {room?.images.length>1&&room.images.map((image,index)=>(
                <img className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage===image&&'outline-3 outline-orange-500'}`} onClick={()=>setMainImage(image)} key={index} src={image} alt="room image" />
            ))}
        </div>
      </div>
      <div>
       {/* room highlights */}
          <div className="flex flex-col md:flex-row md:justify-between mt-10">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h1>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item,index)=>(
                  <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className='text-2xl font-medium '>${room.pricePerNight}/night</p>
          </div>
      </div>
      {/*check in check out*/}
      <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl' action="">
        <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                <div className='flex flex-col'>
                    <label className='font-medium' htmlFor="checkInDate">Check In</label>
                    <input className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' id='checkInDate' type="date" />
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col'>
                    <label className='font-medium' htmlFor="checkOutDate">Check Out</label>
                    <input className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' id='checkOutDate' type="date" />
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col'>
                    <label className='font-medium' htmlFor="Guests">Guests</label>
                    <input className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' id='guests' type="number" />
                </div>

        </div>
        <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                Book Now
        </button>



      </form>
      {/* common specifications */}

      <div className='mt-25 space-y-4'>
        {roomCommonData.map((spec,index)=>(
            <div key={index} className='flex items-start gap-2'>
                <img src={spec.icon} className='w-6.5' alt="" />
                <div>
                    <p className='text-base'>{spec.title}</p>
                    <p className='text-gray-500'>{spec.description}</p>
                </div>
            </div>
        ))}
        </div>

     <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
        <p>
        Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.
        </p>
     </div>
     <div className='flex flex-col items-start gap-4'>
        <div className='flex gap-4'>
            <img className='h-14 w-14 md:h-18 md:w-18 rounded-full ' src={room.hotel.owner.image} alt="host" />
            <div>
                <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                <div className='flex items-center mt-1'>
                    <Starrating/>
                    <p className='ml-2'>200+ reviews</p>
                </div>
            </div>
        </div>
        <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
     </div>
    </div>
  )
}

export default RoomDetails