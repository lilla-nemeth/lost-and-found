import React, { useState } from 'react';
import RadioButton from './generic/RadioButton';
import Checkbox from './generic/Checkbox';

const PetReportOptionalData = (props) => {
    const [uniquefeature, setUniquefeature] = useState('');
    const [breed, setBreed] = useState('');

    const { radio, setRadio, isRequired, isChecked, setIsChecked, optionalInputs } = props;

    let DEBUG = true;

    return (  
            <div className={optionalInputs.display}>
                <div className='filterBox'> 
                    <h2 className='categoryHeadline'>Breed</h2>
                    <div className='inputBox'>
                        <input 
                            className='formInput' 
                            id='breed'
                            autoComplete='breed' 
                            type='text' 
                            name='breed' 
                            placeholder='breed'
                            onChange={event => setBreed(event.target.value)}
                        />
                    </div>
                </div>
                <div className='filterBox'> 
                    <h2 className='categoryHeadline'>Size</h2>
                    <ul className='radioList'>
                        <RadioButton 
                            id={'small'} 
                            name={'size'} 
                            value={'small'} 
                            checked={radio === 'small'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'small'} 
                            labelName={'Small'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'medium'} 
                            name={'size'} 
                            value={'medium'} 
                            checked={radio === 'medium'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'medium'} 
                            labelName={'Medium'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'large'} 
                            name={'size'} 
                            value={'large'} 
                            checked={radio === 'large'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'large'} 
                            labelName={'Large'} 
                            required={isRequired} 
                        />
                    </ul>
                </div> 
                <div className='filterBox'> 
                    <h2 className='categoryHeadline'>Sex</h2>
                    <ul className='radioList'>
                        <RadioButton 
                            id={'male'} 
                            name={'sex'} 
                            value={'male'} 
                            checked={radio === 'male'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'male'} 
                            labelName={'Male'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'female'} 
                            name={'sex'} 
                            value={'female'} 
                            checked={radio === 'female'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'female'} 
                            labelName={'Female'}
                            required={isRequired}
                        />
                        <RadioButton 
                            id={'unknownSex'} 
                            name={'sex'} 
                            value={'unknownSex'} 
                            checked={radio === 'unknownSex'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'unknownSex'} 
                            labelName={'Unknown'}
                            required={isRequired} 
                        />
                    </ul>
                </div> 
                <div className='filterBox'>
                    <h2 className='categoryHeadline'>Color</h2>
                    <ul className='radioList'>
                        {/* FIX THE CHECKBOX */}
                        <Checkbox
                            id={'black'} 
                            name={'color'} 
                            value={'black'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'black'} 
                            labelName={'Black'}
                            // something required...?
                        />
                        <Checkbox
                            id={'brown'} 
                            name={'color'} 
                            value={'brown'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'brown'} 
                            labelName={'Brown'}  
                        />
                        <Checkbox
                            id={'cream'} 
                            name={'color'} 
                            value={'cream'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'cream'} 
                            labelName={'Cream'}  
                        />
                        <Checkbox
                            id={'grey'} 
                            name={'color'} 
                            value={'grey'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'grey'} 
                            labelName={'Grey'}  
                        />
                        <Checkbox
                            id={'red'} 
                            name={'color'} 
                            value={'red'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'red'} 
                            labelName={'Red'}  
                        />
                        <Checkbox
                            id={'white'} 
                            name={'color'} 
                            value={'white'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'white'} 
                            labelName={'White'}  
                        />
                        <Checkbox
                            id={'otherColor'} 
                            name={'color'} 
                            value={'otherColor'} 
                            checked={isChecked} 
                            onChange={event => {setIsChecked(event.target.checked)}} 
                            labelFor={'otherColor'} 
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
                            checked={radio === 'juvenile'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'juvenile'} 
                            labelName={'Juvenile'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'adolescent'} 
                            name={'age'} 
                            value={'adolescent'} 
                            checked={radio === 'adolescent'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'adolescent'} 
                            labelName={'Adolescent'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'adult'} 
                            name={'age'} 
                            value={'adult'} 
                            checked={radio === 'adult'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'adult'} 
                            labelName={'Adult'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'senior'} 
                            name={'age'} 
                            value={'senior'} 
                            checked={radio === 'senior'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'senior'} 
                            labelName={'Senior'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'unknownAge'} 
                            name={'age'} 
                            value={'unknownAge'} 
                            checked={radio === 'unknownAge'} 
                            onChange={event => {setRadio(event.target.value)}} 
                            labelFor={'unknownAge'} 
                            labelName={'Unknown'}
                            required={isRequired} 
                        />
                    </ul>
                </div>
                <div className='filterBox'> 
                    <h2 className='categoryHeadline'>Unique feature</h2>
                    <div className='inputBox'>
                        <input 
                            className='formInput' 
                            id='uniqueFeature'
                            autoComplete='unique feature' 
                            type='text' 
                            name='uniqueFeature' 
                            placeholder='unique feature'
                            onChange={event => setUniquefeature(event.target.value)}
                        />
                    </div>
                </div>
            </div>
    );
}
 
export default PetReportOptionalData;





