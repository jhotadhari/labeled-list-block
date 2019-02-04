/**
 * External dependencies
 */
import PropTypes from 'prop-types';
// import arrayMove from 'array-move';
// const shortid = require('shortid');
import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	Component
} = wp.element;

const { __ } = wp.i18n;

const { InspectorControls } = wp.editor;

const {
    BaseControl,
    TextControl,
    SelectControl,
    TextareaControl,
    Button,
    PanelBody,
} = wp.components;

class InspectorComponent extends Component {
	constructor( props ) {
		super( ...arguments );
	}


	render() {

		const {
			items,
			listSettings,
			setAttributes,
		} = this.props;

		// console.log( 'debug setAttributes', setAttributes );		// ??? debug

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

		</>;
	}
}

// InspectorComponent.propTypes = {
// 	className: PropTypes.string,
// 	items: PropTypes.array,
// 	listSettings: PropTypes.object,
// 	setAttributes: PropTypes.func,
// }

// InspectorComponent.defaultProps = {
// 	items: [],
// }

export default InspectorComponent;