import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGenres, postGame, getAllPlatforms } from '../../actions';
import Style from './Creator.module.css';

