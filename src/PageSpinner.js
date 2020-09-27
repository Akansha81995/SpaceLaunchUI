import React from 'react';

class PageSpinner extends React.Component {
    render() {
        const spinnerVariants = ["primary","secondary","success","danger","warning","info","light","dark"];
        const basicSpinnerGrowing = spinnerVariants.map((variant, idx) => (
            <div key={idx} className={["spinner-grow", "mr-1", `text-${variant}`].join(' ')} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        ));
        return (
            <div>
                {basicSpinnerGrowing}
            </div>
        );
    }
}

export default PageSpinner;