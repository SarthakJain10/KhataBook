import { Card, CardContent } from "./ui/card";
import Image from "next/image";

const Column = ({ data, direction }) => {
  const items = [...data, ...data];

  return (
    <div
      className="
        overflow-hidden 
        h-[28rem] sm:h-[34rem] md:h-[40rem] lg:h-[44rem]
        rounded-2xl sm:rounded-3xl
        [mask-image:linear-gradient(to_bottom,transparent,white_12%,white_88%,transparent)]
        dark:[mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.05)_12%,rgba(0,0,0,0.9)_88%,transparent)]
        transition-colors
      "
    >
      <div
        className={`
          flex flex-col gap-4 sm:gap-5 md:gap-6
          ${direction === "t2b" ? "animate-scroll-t2b" : "animate-scroll-b2t"}
          hover:[animation-play-state:paused]
        `}
      >
        {items.map((testimonial, index) => (
          <Card
            key={index}
            className="
              px-4 sm:px-6 py-4
              bg-white 
              dark:bg-neutral-700/70
              border border-gray-200 
              dark:border-neutral-500/50
              ring-0 dark:ring-1 dark:ring-white/10
              shadow-lg 
              dark:shadow-[0_0_25px_-8px_rgba(0,0,0,0.8)]
              transition-colors
            "
          >
            <CardContent className="p-0">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover"
                />

                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
                “{testimonial.quote}”
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Column;
