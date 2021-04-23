import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './profile-jss';
import catch1 from './background/1.jpg';
import catch2 from './background/10.jpeg';
import catch3 from './background/2.jpg';
import catch4 from './background/3.jpeg';
import catch5 from './background/4.jpeg';
import catch6 from './background/5.jpeg';
import catch7 from './background/6.jpeg';
import catch8 from './background/7.jpeg';
import catch9 from './background/8.jpeg';
import catch10 from './background/9.jpeg';
import catch11 from './background/11.jpg';
import catch12 from './background/12.jpg';
import catch13 from './background/13.png';
import catch14 from './background/14.jpg';
import catch15 from './background/15.jpg';
import catch16 from './background/16.jpg';
import catch17 from './background/17.jpg';
import catch18 from './background/18.jpg';


const PHOTOS = [
  {
    photo: catch1,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch2,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch3,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch4,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch5,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch6,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch8,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch7,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch9,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch10,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch11,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch12,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch13,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch14,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch15,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch16,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch17,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
  {
    photo: catch18,
    caption: "Study Abroad With Primelead Consultancy",
    subcaption: "primelead",
    thumbnail: "https://source.unsplash.com/aZjw7xI3QAA/100x67",
  },
];

function Albums(props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="contained" color="primary" disableElevation>
        Open gallery
      </Button>
      <ReactBnbGallery
        show={isOpen}
        photos={PHOTOS}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

Albums.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Albums);
