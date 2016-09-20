import React from 'react';

export class Tabs extends React.Component {
	constructor (props) {
		super(props);
	};

	render () {
		return (
			<div className="tabs">
				<ul>
					{this.props.tabs.map((m, i) => {
						const classSelected = (m.selected ? 'btn-selected' : '');
						let btnClose = '';
						if (i > 0) {
							btnClose = <span data-id={m.for} className='btn-close-tab'
								onClick={this.props.closeTab}>X</span>;
						}
	          return (
	            <li key={i} className={classSelected}>
            		<span data-id={m.for} onClick={this.props.selectTab}>{m.name}</span>
            		{btnClose}
	            </li>
	          );
	        })}
				</ul>
			</div>
		);
	};
};