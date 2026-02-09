import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <>
      {/* Title */}
      <h1
        className="
          font-extrabold
          text-xl sm:text-2xl md:text-3xl lg:text-[32px]
          text-white tracking-tight
          leading-tight
        "
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subTitle && (
        <p
          className="
            text-xs sm:text-sm md:text-base
            text-gray-400
            mt-2
            max-w-[95%] sm:max-w-[620px]
            leading-relaxed
          "
        >
          {subTitle}
        </p>
      )}

      {/* Divider */}
      <div
        className="
          mt-3 sm:mt-4
          h-[3px]
          w-10 sm:w-14
          rounded-full
          bg-primary
        "
      />
    </>
  )
}

export default Title
