import React from 'react';
import styled from 'styled-components';
import Upload from '../components/upload/Upload';

// https://github.com/wojtekmaj/react-pdf#readme
// 还有两个可能能用的PDF
// https://www.npmjs.com/package/reactjs-pdf-reader
// https://www.npmjs.com/package/react-pdf-to-image

const Noselect = styled.div`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Edge, Opera and Firefox */
`

export default function UploadPage() {
  return (
    <div>
      <Upload />

      {/* <iframe title="upload files" src='http://localhost:3006/filename' width='100%' height='100%' scrolling='yes' seamless></iframe>

      <Noselect>
        <p>Hi can you select me?</p>
        <embed src="./media/pdftest.pdf#toolbar=0&zoom=85&scrollbar=0&navpanes=0" type="application/pdf" width="50%" height="600px" />
      </Noselect> */}

    </div>
  );
}