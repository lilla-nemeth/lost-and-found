import React, { useState } from 'react';


const SelectAll = (props) => {
    const { deleteUserAllPets, disabledAll, allChecked, setAllChecked, petCardChecked, setPetCardChecked } = props;

    let DEBUG = false;

        return (
            <div className='selectBox'>
                <div className='deleteAllButtonBox'>
                    <button 
                        className={disabledAll ? 'deleteAllButtonInactive' : 'deleteAllButton'}
                        disabledAll={disabledAll}
                        onClick={() => deleteUserAllPets()}
                    >
                        Delete All Pets
                    </button>
                </div>
                <div>
                    <label className='checkboxContainer'>
                      <input
                        type='checkbox'
                        checked={allChecked}
                        onChange={() => {setAllChecked(!allChecked); setPetCardChecked(petCardChecked)}}
                      />
                      <span class='checkmark'></span>
                    </label>
                </div>
            </div>
        );
}

export default SelectAll;