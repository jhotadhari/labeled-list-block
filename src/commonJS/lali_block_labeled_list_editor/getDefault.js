/**
 * WordPress dependencies
 */
const { applyFilters } = wp.hooks;

const getDefault = ( key, args ) => {

	switch( key ){

		case 'listSettings':
			return applyFilters( 'lali.default.listSettings', {
				labelWidth: {
					value: '100',
					unit: 'px',			// px || percent
				},
				listStyle: 'inherit',
				margin: '',
				padding: '',
			}, args );

	}
};

export default getDefault;
