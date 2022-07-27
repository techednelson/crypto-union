import React, { memo } from 'react';

interface IYoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed = ({ embedId }: IYoutubeEmbedProps) => {
  return (
    <iframe
      className="rounded m-auto"
      width="400"
      height="250"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Crypto Union Demo"
    />
  );
};

export const MemoizedYoutubeEmbed = memo(YoutubeEmbed);
