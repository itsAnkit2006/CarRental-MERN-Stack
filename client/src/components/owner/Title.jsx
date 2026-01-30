import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="font-extrabold text-2xl md:text-3xl text-white tracking-tight">
        {title}
      </h1>

      <p className="text-sm md:text-base text-gray-400 mt-2 max-w-[620px] leading-relaxed">
        {subTitle}
      </p>

      <div className="mt-4 h-[3px] w-14 rounded-full bg-primary"></div>
    </>
  )
}

export default Title
