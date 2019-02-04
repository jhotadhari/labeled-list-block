/**
 * External dependencies
 */
import extender from 'object-extender';
import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import getDefault 			from './lali_block_labeled_list_editor/getDefault';
import parseSerialized 		from './lali_block_labeled_list_editor/parseSerialized';
import ListComponent 		from './lali_block_labeled_list_editor/components/ListComponent.jsx';
import InspectorComponent 	from './lali_block_labeled_list_editor/components/InspectorComponent.jsx';

const blockAttributes = {
	items: {
		type: 'array',
		default: [],
	},
	listSettings: {
		type: 'string',
		default: JSON.stringify( getDefault( 'listSettings' ) ),
	},
};

registerBlockType( 'lali/labeled-list', {
	title: __( 'Labeled List' ),
	icon: 'list-view',
	category: 'common',

    attributes: blockAttributes,

    edit( { className, attributes, setAttributes } ) {

    	const {
    		items,
    	} = attributes;

    	const listSettings = extender.merge( getDefault( 'listSettings' ), parseSerialized( attributes.listSettings ) );

    	const classNameSorted = className.split( ' ' ).sort( ( a, b ) => {
			if ( 'wp-block-lali-labeled-list' === a ) return 1;
			if ( 'wp-block-lali-labeled-list' === b ) return -1;
			return 0;
    	} ).join( ' ' );

        return <>

        	<InspectorComponent
				items={ items }
				listSettings={ listSettings }
				setAttributes={ setAttributes }
        	/>

			<ListComponent
				className={ classNameSorted }
				items={ items }
				listSettings={ listSettings }
				setAttributes={ setAttributes }
			/>
        </>;
    },

    save( { attributes } ) {

    	const {
    		items,
    		className,
    	} = attributes;

    	const classNameSorted = [
    		className,
    		'wp-block-lali-labeled-list',
    	].join( ' ' );

    	const listSettings = extender.merge( getDefault( 'listSettings' ), parseSerialized( attributes.listSettings ) );

		return <ListComponent
			className={ classNameSorted }
			items={ items }
			listSettings={ listSettings }
		/>;

    },



    deprecated: [
        {
            attributes: blockAttributes,

            save( { attributes } ) {
            	return null;
			}
        },
    ],

});
