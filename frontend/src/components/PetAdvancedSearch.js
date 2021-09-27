import React from 'react';

// Fix the the advanced search style - be similar like in PetReport
const styles = {
    smallBoxes: {
        // justifyContent: 'space-between',
        width: '830px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    sexBox: {
        background: 'rgba(255,255,255)', 
        marginBottom: '13px', 
        padding: '25px', 
        height: 'fit-content',
        maxWidth: '50%',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    }, 
    ageBox: {
        background: 'rgba(255,255,255)', 
        marginBottom: '50px', 
        padding: '25px', 
        maxWidth: '100%',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    }, 
    sexCategory: {
        paddingBottom: '15px',
    },
}

// Buttons:
// - species: all/dog/cat/other
// - place (zip, municipality, region) - all
// - lost/found/reunited

// - sex
// - size: small/medium/large
// - age: puppy/kitten /adult/old/unknown
// - age: juvenile/adolescent/adult/senior/unknown


const PetSortingButtons = () => {
    
    let DEBUG = true;

    return (  
        <div> 
            <div style={styles.smallBoxes}>     
            {/* sex */}
                <div style={styles.sexBox}>
                    <h2 style={styles.sexCategory}>sex</h2>
                    <ul className='radioList'>
                        <li style={styles.radioListElements}>
                            <input type='radio' id='male' name='sex' />
                            <label for='male'>Male</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='female' name='sex' />
                            <label for='female'>Female</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                        <li>
                            <input type='radio' id='unknownsex' name='sex' />
                            <label for='unknownsex'>Unknown</label>
                            <div class="radioCheck"><div class="radioCheckInside"></div></div>
                        </li>
                    </ul>
                </div>
                {/* SIZE */}
                <div style={styles.sexBox}>
                    <h2 style={styles.sexCategory}>Size</h2>
                    <ul className='radioList'>
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
                <h2 style={styles.sexCategory}>Age</h2>
                <ul className='radioList'>
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
                        <input type='radio' id='unknownAge' name='age' />
                        <label for='unknownAge'>Unknown</label>
                        <div class="radioCheck"><div class="radioCheckInside"></div></div>
                    </li>
                </ul>
            </div>



            {/* EDIT TO CHECKBOX FORMAT!!!!!!!!!!!!!!!!!!!!!!!! */}
            {/* <div style={styles.sexBox}>
                <h2 style={styles.sexCategory}>Status</h2>
                <ul className='radioList'>
                    <li style={styles.radioListElements}>
                        <input type='checkbox' checked id='lost' name='sex' />
                        <label for='lost'>Lost</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                    <li>
                        <input type='checkbox' id='found' name='sex' />
                        <label for='found'>Female</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                    <li>
                        <input type='checkbox' id='reunited' name='sex' />
                        <label for='reunited'>Reunited</label>
                        <div class="check"><div class="inside1"></div></div>
                    </li>
                </ul>
            </div> */}
        </div>
    );
}
 
export default PetSortingButtons;
