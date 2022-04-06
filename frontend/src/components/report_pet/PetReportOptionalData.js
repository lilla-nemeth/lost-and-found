import React from 'react';
import RadioButton from '../generic/RadioButton';
import Checkbox from '../generic/Checkbox';
import TextInput from '../generic/TextInput';
import { changeCheckboxValue } from '../HelperFunctions.js';

const PetReportOptionalData = (props) => {
  const {
    size,
    setSize,
    breed,
    setBreed,
    sex,
    setSex,
    colors,
    setColors,
    age,
    setAge,
    uniquefeature,
    setUniquefeature,
    isRequired,
    optionalInputs,
  } = props;

  let DEBUG = false;

  return (
    <div className={optionalInputs.display}>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Size</h2>
        <ul className='radioList'>
          <RadioButton
            id={'small'}
            name={'size'}
            value={'small'}
            checked={size === 'small'}
            onChange={(event) => {
              setSize(event.target.value);
            }}
            htmlFor={'small'}
            labelName={'Small'}
            required={isRequired}
          />
          <RadioButton
            id={'medium'}
            name={'size'}
            value={'medium'}
            checked={size === 'medium'}
            onChange={(event) => {
              setSize(event.target.value);
            }}
            htmlFor={'medium'}
            labelName={'Medium'}
            required={isRequired}
          />
          <RadioButton
            id={'large'}
            name={'size'}
            value={'large'}
            checked={size === 'large'}
            onChange={(event) => {
              setSize(event.target.value);
            }}
            htmlFor={'large'}
            labelName={'Large'}
            required={isRequired}
          />
        </ul>
      </div>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Breed</h2>
        <div className='inputBox'>
          <input
            className='formInput'
            id='breed'
            type='text'
            name='breed'
            value={breed}
            placeholder='breed'
            onChange={(event) => setBreed(event.target.value)}
          />
        </div>
      </div>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Sex</h2>
        <ul className='radioList'>
          <RadioButton
            id={'male'}
            name={'sex'}
            value={'male'}
            checked={sex === 'male'}
            onChange={(event) => {
              setSex(event.target.value);
            }}
            htmlFor={'male'}
            labelName={'Male'}
            required={isRequired}
          />
          <RadioButton
            id={'female'}
            name={'sex'}
            value={'female'}
            checked={sex === 'female'}
            onChange={(event) => {
              setSex(event.target.value);
            }}
            htmlFor={'female'}
            labelName={'Female'}
            required={isRequired}
          />
          <RadioButton
            id={'unknownSex'}
            name={'sex'}
            value={'unknown'}
            checked={sex === 'unknown'}
            onChange={(event) => {
              setSex(event.target.value);
            }}
            htmlFor={'unknownSex'}
            labelName={'Unknown'}
            required={isRequired}
          />
        </ul>
      </div>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Color</h2>
        <ul className='radioList'>
          <Checkbox
            id={'black'}
            name={'color'}
            value={'black'}
            checked={colors.includes('black')}
            onChange={() => changeCheckboxValue(colors, setColors, 'black')}
            htmlFor={'black'}
            labelName={'Black'}
          />
          <Checkbox
            id={'brown'}
            name={'color'}
            value={'brown '}
            checked={colors.includes('brown')}
            onChange={() => changeCheckboxValue(colors, setColors, 'brown')}
            htmlFor={'brown'}
            labelName={'Brown'}
          />
          <Checkbox
            id={'cream'}
            name={'color'}
            value={'cream '}
            checked={colors.includes('cream')}
            onChange={() => changeCheckboxValue(colors, setColors, 'cream')}
            htmlFor={'cream'}
            labelName={'Cream'}
          />
          <Checkbox
            id={'grey'}
            name={'color'}
            value={'grey '}
            checked={colors.includes('grey')}
            onChange={() => changeCheckboxValue(colors, setColors, 'grey')}
            htmlFor={'grey'}
            labelName={'Grey'}
          />
          <Checkbox
            id={'red'}
            name={'color'}
            value={'red '}
            checked={colors.includes('red')}
            onChange={() => changeCheckboxValue(colors, setColors, 'red')}
            htmlFor={'red'}
            labelName={'Red'}
          />
          <Checkbox
            id={'white'}
            name={'color'}
            value={'white '}
            checked={colors.includes('white')}
            onChange={() => changeCheckboxValue(colors, setColors, 'white')}
            htmlFor={'white'}
            labelName={'White'}
          />
          <Checkbox
            id={'otherColor'}
            name={'color'}
            value={'otherColor'}
            checked={colors.includes('other')}
            onChange={() => changeCheckboxValue(colors, setColors, 'other')}
            htmlFor={'otherColor'}
            labelName={'Other'}
          />
        </ul>
      </div>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Age</h2>
        <ul className='radioList'>
          <RadioButton
            id={'juvenile'}
            name={'age'}
            value={'juvenile'}
            checked={age === 'juvenile'}
            onChange={(event) => {
              setAge(event.target.value);
            }}
            htmlFor={'juvenile'}
            labelName={'Juvenile'}
            required={isRequired}
          />
          <RadioButton
            id={'adolescent'}
            name={'age'}
            value={'adolescent'}
            checked={age === 'adolescent'}
            onChange={(event) => {
              setAge(event.target.value);
            }}
            htmlFor={'adolescent'}
            labelName={'Adolescent'}
            required={isRequired}
          />
          <RadioButton
            id={'adult'}
            name={'age'}
            value={'adult'}
            checked={age === 'adult'}
            onChange={(event) => {
              setAge(event.target.value);
            }}
            htmlFor={'adult'}
            labelName={'Adult'}
            required={isRequired}
          />
          <RadioButton
            id={'senior'}
            name={'age'}
            value={'senior'}
            checked={age === 'senior'}
            onChange={(event) => {
              setAge(event.target.value);
            }}
            htmlFor={'senior'}
            labelName={'Senior'}
            required={isRequired}
          />
          <RadioButton
            id={'unknownAge'}
            name={'age'}
            value={'unknown'}
            checked={age === 'unknown'}
            onChange={(event) => {
              setAge(event.target.value);
            }}
            htmlFor={'unknownAge'}
            labelName={'Unknown'}
            required={isRequired}
          />
        </ul>
      </div>
      <div className='filterBox'>
        <h2 className='categoryHeadline'>Unique feature</h2>
        <TextInput
          headlineName={'Unique feature'}
          id={'uniquefeature'}
          name={'uniquefeature'}
          type={'text'}
          value={uniquefeature}
          placeholder={'unique feature'}
          onChange={(event) => setUniquefeature(event.target.value)}
        />
      </div>
    </div>
  );
};

export default PetReportOptionalData;
