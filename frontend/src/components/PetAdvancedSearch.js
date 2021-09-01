import React from 'react';

const styles = {
    smallBoxes: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '830px',
    },
    genderBox: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '13px', 
        padding: '25px', 
        height: 'fit-content',
        maxWidth: '50%',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    }, 
    ageBox: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '50px', 
        padding: '25px', 
        maxWidth: '100%',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    }, 
    genderCategory: {
        paddingBottom: '15px',
    },
    radioList: {
        display: 'flex',
    }
}

// Buttons:
// - species: all/dog/cat/other
// - place (zip, municipality, region) - all
// - lost/found/reunited

// - gender
// - size: small/medium/large
// - age: puppy/kitten /adult/old/unknown
// - age: juvenile/adolescent/adult/senior/unknown


const PetSortingButtons = () => {
    
    let DEBUG = true;

    return (  
        <div> 
            <div style={styles.smallBoxes}>     
            {/* GENDER */}
                <div style={styles.genderBox}>
                    <h2 style={styles.genderCategory}>Gender</h2>
                    <ul style={styles.radioList}>
                        <li style={styles.radioListElements}>
                            <input type='radio' id='male' name='gender' />
                            <label for='male'>Male</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='female' name='gender' />
                            <label for='female'>Female</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='genderunknown' name='gender' />
                            <label for='genderunknown'>Unknown</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                    </ul>
                </div>
                {/* SIZE */}
                <div style={styles.genderBox}>
                    <h2 style={styles.genderCategory}>Size</h2>
                    <ul style={styles.radioList}>
                        <li style={styles.radioListElements}>
                            <input type='radio' id='small' name='size' />
                            <label for='small'>Small</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='medium' name='size' />
                            <label for='medium'>Medium</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='large' name='size' />
                            <label for='large'>Large</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                    </ul>
                </div>
            </div>
            {/* AGE */}
            <div style={styles.ageBox}>
                <h2 style={styles.genderCategory}>Age</h2>
                <ul style={styles.radioList}>
                    <li style={styles.radioListElements}>
                        <input type='radio' id='juvenile' name='age' />
                        <label for='juvenile'>Juvenile</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                    <li>
                        <input type='radio' id='adolescent' name='age' />
                        <label for='adolescent'>Adolescent</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                    <li>
                        <input type='radio' id='adult' name='age' />
                        <label for='adult'>Adult</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                    <li>
                        <input type='radio' id='senior' name='age' />
                        <label for='senior'>Senior</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                    <li>
                        <input type='radio' id='ageunknown' name='age' />
                        <label for='ageunknown'>Unknown</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                </ul>
            </div>



            {/* EDIT TO CHECKBOX FORMAT!!!!!!!!!!!!!!!!!!!!!!!! */}
            {/* <div style={styles.genderBox}>
                <h2 style={styles.genderCategory}>Status</h2>
                <ul style={styles.radioList}>
                    <li style={styles.radioListElements}>
                        <input type='checkbox' checked id='lost' name='gender' />
                        <label for='lost'>Lost</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                    <li>
                        <input type='checkbox' id='found' name='gender' />
                        <label for='found'>Female</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                    <li>
                        <input type='checkbox' id='reunited' name='gender' />
                        <label for='reunited'>Reunited</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                </ul>
            </div> */}
        </div>
    );
}
 
export default PetSortingButtons;
