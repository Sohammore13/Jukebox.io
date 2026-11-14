import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10 group-hover:h-2 transition-all duration-200">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[#9B5CFF] via-[#7B42FF] to-[#32D9FF] group-hover:from-[#B07AFF] group-hover:to-[#5BE0FF]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-3.5 w-3.5 rounded-full bg-white border-2 border-[#32D9FF] shadow-[0_0_10px_rgba(50,217,255,0.7)] transition-all duration-200 focus-visible:outline-none focus-visible:scale-125 hover:scale-125 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
