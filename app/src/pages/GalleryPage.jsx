import React, { useState } from 'react';
import AlbumLayout from '../components/gallery/AlbumLayout';
import AlbumLayout2 from '../components/gallery/AlbumLayout2';

export default function GalleryPage() {
  const [media, setMedia] = useState("tb_media");

  return (
    media === "tb_media" ? (
      <div>
        <AlbumLayout selectMedia={(media) => setMedia(media)} />
      </div>
    ) : (
        <div>
          <AlbumLayout2 selectMedia={(media) => setMedia(media)} />
        </div>
      )
  );
}