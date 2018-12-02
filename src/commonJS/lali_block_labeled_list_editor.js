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
const { InspectorControls } = wp.editor;
const {
    BaseControl,
    TextControl,
    SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import getDefault 		from './lali_block_labeled_list_editor/getDefault';
import parseSerialized 	from './lali_block_labeled_list_editor/parseSerialized';
import ListComponent 	from './lali_block_labeled_list_editor/components/ListComponent.jsx';

registerBlockType( 'lali/labeled-list', {
	title: __( 'Labeled List' ),
	icon: 'list-view',
	category: 'common',

    attributes: {
        items: {
        	type: 'array',
        	default: [],
        },
        listSettings: {
        	type: 'string',
        	default: JSON.stringify( getDefault( 'listSettings' ) ),
        },
    },

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
			<InspectorControls>
				<BaseControl
					label={ __( 'Label Base Width', 'lali'  ) }
					className={ 'lali-columns-field' }
				>
					<TextControl
						value={ get( listSettings, ['labelWidth', 'value'] ) }
						type={ 'number' }
						onChange={ ( newVal ) => setAttributes( {
							listSettings: JSON.stringify( {
								...listSettings,
								labelWidth: {
									...get( listSettings, ['labelWidth'] ),
									value: newVal,
								},
							} ),
						} ) }
					/>

					<SelectControl
						value={ get( listSettings, ['labelWidth', 'unit'] ) }
						className={ 'lali-columns-field-30 lali-columns-field-no-margin' }
						options={ [
							{ label: 'px', value: 'px' },
							{ label: '%', value: 'percent' },
						] }
						onChange={ ( newVal ) => setAttributes( {
							listSettings: JSON.stringify( {
								...listSettings,
								labelWidth: {
									...get( listSettings, ['labelWidth'] ),
									unit: newVal,
								},
							} ),
						} ) }
					/>
				</BaseControl>

				<SelectControl
					label={ __( 'List Style', 'lali'  ) }
					value={ get( listSettings, ['listStyle'] ) }
					options={ [
						{ label: 'inherit', value: 'inherit' },
						{ label: 'none', value: 'none' },
						{ label: 'disc', value: 'disc' },
						{ label: 'square', value: 'square' },
						{ label: 'circle', value: 'circle' },
						{ label: 'decimal', value: 'decimal' },
					] }
					onChange={ ( newVal ) => setAttributes( {
						listSettings: JSON.stringify( {
							...listSettings,
							listStyle: newVal,
						} ),
					} ) }
				/>

				<TextControl
					label={ __( 'Margin', 'lali'  ) }
					value={ get( listSettings, ['margin'] ) }
					onChange={ ( newVal ) => setAttributes( {
						listSettings: JSON.stringify( {
							...listSettings,
							margin: newVal,
						} ),
					} ) }
				/>

				<TextControl
					label={ __( 'Padding', 'lali'  ) }
					value={ get( listSettings, ['padding'] ) }
					onChange={ ( newVal ) => setAttributes( {
						listSettings: JSON.stringify( {
							...listSettings,
							padding: newVal,
						} ),
					} ) }
				/>

			</InspectorControls>

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

    }

});
