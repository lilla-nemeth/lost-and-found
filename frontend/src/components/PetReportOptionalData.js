import React from 'react';
import RadioButton from './generic/RadioButton';
import Checkbox from './generic/Checkbox';

// Radiobuttons and checkboxes: Check the value attributes! change them if necessary: {''} -> {}

const PetReportOptionalData = (props) => {
    const { 
        size,
        setSize,
        breed,
        setBreed,
        sex,
        setSex,
        color,
        setColor,
        age,
        setAge,
        uniquefeature,
        setUniquefeature,
        isRequired, 
        isChecked, 
        setIsChecked, 
        optionalInputs 
    } = props;

    let DEBUG = true;

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
                            onChange={event => {setSize(event.target.value)}} 
                            labelFor={'small'} 
                            labelName={'Small'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'medium'} 
                            name={'size'} 
                            value={'medium'} 
                            checked={size === 'medium'} 
                            onChange={event => {setSize(event.target.value)}} 
                            labelFor={'medium'} 
                            labelName={'Medium'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'large'} 
                            name={'size'} 
                            value={'large'} 
                            checked={size === 'large'} 
                            onChange={event => {setSize(event.target.value)}} 
                            labelFor={'large'} 
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
                            onChange={event => setBreed(event.target.value)}
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
                            onChange={event => {setSex(event.target.value)}} 
                            labelFor={'male'} 
                            labelName={'Male'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'female'} 
                            name={'sex'} 
                            value={'female'} 
                            checked={sex === 'female'} 
                            onChange={event => {setSex(event.target.value)}} 
                            labelFor={'female'} 
                            labelName={'Female'}
                            required={isRequired}
                        />
                        <RadioButton 
                            id={'unknownSex'} 
                            name={'sex'} 
                            value={'unknownSex'} 
                            checked={sex === 'unknownSex'} 
                            onChange={event => {setSex(event.target.value)}} 
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
                            checked={age === 'juvenile'} 
                            onChange={event => {setAge(event.target.value)}} 
                            labelFor={'juvenile'} 
                            labelName={'Juvenile'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'adolescent'} 
                            name={'age'} 
                            value={'adolescent'} 
                            checked={age === 'adolescent'} 
                            onChange={event => {setAge(event.target.value)}} 
                            labelFor={'adolescent'} 
                            labelName={'Adolescent'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'adult'} 
                            name={'age'} 
                            value={'adult'} 
                            checked={age === 'adult'} 
                            onChange={event => {setAge(event.target.value)}} 
                            labelFor={'adult'} 
                            labelName={'Adult'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'senior'} 
                            name={'age'} 
                            value={'senior'} 
                            checked={age === 'senior'} 
                            onChange={event => {setAge(event.target.value)}} 
                            labelFor={'senior'} 
                            labelName={'Senior'}
                            required={isRequired} 
                        />
                        <RadioButton 
                            id={'unknownAge'} 
                            name={'age'} 
                            value={'unknownAge'} 
                            checked={age === 'unknownAge'} 
                            onChange={event => {setAge(event.target.value)}} 
                            labelFor={'unknownAge'} 
                            labelName={'Unknown'}
                            required={isRequired} 
                        />
                    </ul>
                </div>
                <TextInput 
                    headlineName={'Unique feature'}
                    id={'uniquefeature'}
                    name={'uniquefeature'}
                    value={uniquefeature}
                    placeholder={'unique feature'}
                    onChange={event => setUniquefeature(event.target.value)}
                    // required={!isRequired}
                />
            </div>
    );
}
 
export default PetReportOptionalData;





