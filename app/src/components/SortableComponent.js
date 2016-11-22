import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});

class SortableComponent extends Component {
    constructor(props){
      super(props)
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.reOrderItems(oldIndex, newIndex)
    };
    render() {
        return (
            <SortableList items={this.props.items} pressDelay={200} onSortEnd={this.onSortEnd} />
        )
    }
}

export default SortableComponent
