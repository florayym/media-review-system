import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TypeSelector from './TypeSelector';
import FormatSelector from './FormatSelector';

export default function OptionForm(props) {
  const [type, setType] = useState(props.default_type);

  const onSelectType = (type) => {
    props.type(type);
    setType(type);
  }

  const onSelectFormat = (format) => {
    props.format(format);
  }

  /*
   <script language="javascript" type="text/javascript">
  window.top.window.DisplayImage('files/download/home2015/20200522/05/EY6M1GIteaCSJth1/loneliness_in_the_park_origin_690px.jpg',690,460)
  </script>
  */

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TypeSelector
            default_type={props.default_type}
            onSelectType={type => onSelectType(type)}
          />
        </Grid>
        {type === 'audio/*, video/*' ? (
          <Grid item xs={12}>
            <FormatSelector
              default_format={props.default_format}
              onSelectFormat={format => onSelectFormat(format)}
            />
          </Grid>
        ) : null}

        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}