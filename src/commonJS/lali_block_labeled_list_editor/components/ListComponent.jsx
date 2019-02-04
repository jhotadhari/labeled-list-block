/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
const shortid = require('shortid');
import {
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
const {
	Component
} = wp.element;

const {
	RichText
} = wp.editor;

const {
    Button,
    Dashicon,
    BaseControl,
} = wp.components;

/**
 * Internal dependencies
 */
import defaults 					from '../defaults';

class ListComponent extends Component {
	constructor( props ) {
		super( ...arguments );

		this.onAddNewItem = this.onAddNewItem.bind(this);
		this.onRemoveItem = this.onRemoveItem.bind(this);
		this.onChangeItem = this.onChangeItem.bind(this);
		this.onMoveItemUp = this.onMoveItemUp.bind(this);
		this.onMoveItemDown = this.onMoveItemDown.bind(this);
		this.getLabelStyle = this.getLabelStyle.bind(this);
	}

	onAddNewItem(){
		const { items, setAttributes } = this.props;
		const newItems = [
			...items,
			{
				...defaults.item,
				id: shortid.generate(),
			},
		];
		setAttributes( { items: newItems } );
	}

	onRemoveItem( index ) {
		const { items, setAttributes } = this.props;
		const newItems = [...items];
		newItems.splice(index, 1);
		setAttributes( { items: newItems } );
	}

	onChangeItem( index, key, value  ) {
		const { items, setAttributes } = this.props;
		const newItems = [...items];
		const newItem ={
			...newItems[index],
			[key]: value
		};
		newItems[index] = newItem;
		setAttributes( { items: newItems } );
	}

	onMoveItemUp( index  ) {
		const { items, setAttributes } = this.props;
		if ( index === 0 ) return;
		const newItems = arrayMove( [...items], index, index - 1 );
		setAttributes( { items: newItems } );
	}

	onMoveItemDown( index  ) {
		const { items, setAttributes } = this.props;
		if ( index === items.length - 1 ) return;
		const newItems = arrayMove( [...items], index, index + 1 );
		setAttributes( { items: newItems } );
	}

	getLabelStyle( ) {
		const { listSettings } = this.props;
		let value = String( get( listSettings, ['labelWidth', 'value'] ) );
		let unit = get( listSettings, ['labelWidth', 'unit'] );
		unit = 'percent' === unit ? '%' : unit;
		return {
			flexBasis: value + unit,
		};
	}

	render() {

		const {
			className,
			items,
			listSettings,
			setAttributes,
			deprecated,
		} = this.props;

		return <>

			<ul
				className={ className }
				style={ {
					listStyle: get( listSettings, ['listStyle'] ),
					...( get( listSettings, ['margin'] ).length && { margin: get( listSettings, ['margin'] ) } ),
					...( get( listSettings, ['padding'] ).length && { padding: get( listSettings, ['padding'] ) } ),
				} }
			>

				{ items.map( ( item, index ) => [

					<li
						className={ className + '-item' }
						key={ item.id }
					>

						<div
							className={ className + '-item-inner' }
						>
							<div
								className={ 'label' }
								style={ this.getLabelStyle() }
								{ ...( undefined === setAttributes && { dangerouslySetInnerHTML:{ __html: item.label } } ) }
							>
								{ undefined !== setAttributes &&
									<RichText
										value={ item.label }
										onChange={ ( newVal ) => this.onChangeItem( index, 'label', newVal ) }
										placeholder={ 'placeholder' }
									/>
								}
							</div>

							<div
								className={ 'value' }
								{ ...( undefined === setAttributes && { dangerouslySetInnerHTML:{ __html: item.value } } ) }
							>
								{ undefined !== setAttributes &&
									<RichText
										value={ item.value }
										onChange={ ( newVal ) => this.onChangeItem( index, 'value', newVal ) }
										placeholder={ 'placeholder' }
									/>
								}
							</div>

						</div>

						{ undefined !== setAttributes &&
							<div
								className={ 'controls' }
							>
								<Button
									onClick={ ( event ) => this.onMoveItemUp( index ) }
									className={ 'control up'}
									disabled={ index === 0 }
								>
									<Dashicon icon={ 'arrow-up-alt' } className="" />
								</Button>

								<Button
									onClick={ ( event ) => this.onMoveItemDown( index ) }
									className={ 'control down'}
									disabled={ index + 1 === items.length }
								>
									<Dashicon icon={ 'arrow-down-alt' } className="" />
								</Button>

								<Button
									onClick={ ( event ) => this.onRemoveItem( index ) }
									className={'control remove'}
								>
									<Dashicon icon={ 'minus' } className="" />
								</Button>
							</div>
						}

					</li>

				] ) }

			</ul>

			{ undefined !== setAttributes &&
				<div className={ className + '-controls' }>
					<Button
						onClick={ this.onAddNewItem }
						className={ className + '-controls-control add'}
					>
						<Dashicon icon={ 'plus' } className="" />
					</Button>
				</div>
			}

		</>;
	}
}

ListComponent.propTypes = {
	className: PropTypes.string,
	items: PropTypes.array,
	listSettings: PropTypes.object,
	setAttributes: PropTypes.func,
}

ListComponent.defaultProps = {
	items: [],
}

export default ListComponent;