import { useEffect, useRef } from 'react';

import classes from './PackageSelection.module.css';

const PackageSelection = props => {
  const economyBtnRef = useRef(null);
  const premiumBtnRef = useRef(null);
  const businessBtnRef = useRef(null);

  useEffect(() => {
    switch (props.selectedPackage) {
      case 'economy':
        economyBtnRef.current.classList.add(classes.SelectedPackage);
        premiumBtnRef.current.classList.remove(classes.SelectedPackage);
        businessBtnRef.current.classList.remove(classes.SelectedPackage);
        break;
      case 'premium':
        premiumBtnRef.current.classList.add(classes.SelectedPackage);
        economyBtnRef.current.classList.remove(classes.SelectedPackage);
        businessBtnRef.current.classList.remove(classes.SelectedPackage);
        break;
      case 'business':
        businessBtnRef.current.classList.add(classes.SelectedPackage);
        economyBtnRef.current.classList.remove(classes.SelectedPackage);
        premiumBtnRef.current.classList.remove(classes.SelectedPackage);
        break;
      default:
        break;
    }
  }, [props.selectedPackage]);

  return (
    <div className={classes.PackageSelection}>
      <div
        className={classes.PackageCard}
        onClick={() => props.onSelectedPackageClick('economy')}
        ref={economyBtnRef}
      >
        <h3>ECONOMY</h3>
        <p>- Bagaż podręczny (1x 8kg)</p>
        <br />
        <br />
        <br />
        <h3>{props.prices.economy} PLN</h3>
        <p>
          <small>za pasażera</small>
        </p>
      </div>
      <div
        className={classes.PackageCard}
        onClick={() => props.onSelectedPackageClick('premium')}
        ref={premiumBtnRef}
      >
        <h3>PREMIUM</h3>
        <p>- Bagaż podręczny (1x 9kg)</p>
        <p>- Bagaż rejestrowany (1x 23kg)</p>
        <br />
        <h3>{props.prices.premium} PLN</h3>
        <p>
          <small>za pasażera</small>
        </p>
      </div>
      <div
        className={classes.PackageCard}
        onClick={() => props.onSelectedPackageClick('business')}
        ref={businessBtnRef}
      >
        <h3>BUISNESS</h3>
        <p>- Bagaż podręczny (2x 9kg)</p>
        <p>- Bagaż rejestrowany (2x 32kg)</p>
        <br />
        <h3>{props.prices.business} PLN</h3>
        <p>
          <small>za pasażera</small>
        </p>
      </div>
    </div>
  );
};

export default PackageSelection;
