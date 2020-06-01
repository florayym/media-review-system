import React, { Fragment } from 'react';

export default function ReviewTBMedia() {
  return (
    <Fragment>

      <div>
        <h1>
          Hi I am in tb_media review!
        </h1>
      </div>
      <div class="embed-responsive embed-responsive-16by9">

        <video src="./media/小型北斗II卫星观测站.mp4" autoPlay height="300" width="400" controls>
        </video>
      </div>
    </Fragment>
  );
}