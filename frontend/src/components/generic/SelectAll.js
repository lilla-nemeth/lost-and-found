import React, { useState } from 'react';


const SelectAll = (props) => {
    const { deleteUserAllPets, allChecked, setAllChecked, petCardChecked, setPetCardChecked, loading } = props;

    let disabledAll = !allChecked || loading;

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