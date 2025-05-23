import { MasterRecursiveComponent } from "@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent";
import { Slide, Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  slide: Slide;
  theme: Theme;
  src: string;
};

const ThumbnailPreview = ({ slide, theme, src }: Props) => {
  //WIP : add a preview of the slide

  return (
    <div
      className={cn(
        "w-full relative aspect-[16/9] overflow-hidden rounded-lg transition-all duration-200 p-2"
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.backgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
          <MasterRecursiveComponent
            content={slide.content}
            onContentChange={() => {}}
            slideId={slide.id}
            isPreview={true}
            isEditable={false}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-400 flex justify-center items-center">
          {/* <Image 
            className='w-6 h-6 text-gray-500' 
          /> */}
          <Image src={src} alt={src} className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
