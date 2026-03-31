import React from 'react'

const Title = ({ title, subTitle, align }) => {

  const alignment =
    align === "left"
      ? "items-center text-center md:items-start md:text-left"
      : "items-center text-center";

  return (
    <div className={`flex flex-col justify-center ${alignment}`}>
      
      {/* Title */}
      <h1 className="
        font-extrabold
        text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
        tracking-tight text-white
        leading-tight
      ">
        {title}
      </h1>

      {/* Accent Bar */}
      <div className="
        mt-3
        h-[3px]
        w-12 sm:w-16
        bg-primary rounded-full
      " />

      {/* Subtitle */}
      {subTitle && (
        <p className="
          text-sm sm:text-base
          text-gray-400
          mt-4
          max-w-[90%] sm:max-w-[620px]
          leading-relaxed
        ">
          {subTitle}
        </p>
      )}
    </div>
  )
}

export default Title
