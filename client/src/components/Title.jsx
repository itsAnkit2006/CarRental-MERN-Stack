import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === "left" && "md:items-start md:text-left"}`}>
  <h1 className="font-extrabold text-3xl md:text-[42px] tracking-tight text-white">
    {title}
  </h1>

  <div className="mt-3 h-[3px] w-16 bg-primary rounded-full"></div>

  <p className="text-sm md:text-base text-gray-400 mt-4 max-w-[620px] leading-relaxed">
    {subTitle}
  </p>
</div>

  )
}

export default Title
