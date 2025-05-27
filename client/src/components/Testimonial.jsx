import React from 'react'
import Title from './Title'
import { assets, testimonials } from '../assets/assets'
import Starrating from './Starrating';
const Star = ({ filled }) => (
    <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
    </svg>
);
const Testimonial = () => {
    return (

        <div className='flex flex-col items-center  px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
            <Title title="What our Guests Say" subTitle={"Discover ehy discerning travelers consistently choose Quickstay for their exclusive and luxurious accomodations around the world."} />
            <div className="flex flex-wrap items-center gap-6 mt-20 ">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow ">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            <Starrating />
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Testimonial