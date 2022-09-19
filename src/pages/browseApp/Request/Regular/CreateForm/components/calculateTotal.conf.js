import { getDataItemById } from '@state/selectors/common'
import { getConfigCategoryById } from '@state/selectors/appConfig'

const mapStateToProps = (state, ownProps) => {
  const { model = {}, isEdit } = ownProps
  const {
    vehicleCategory,
    packageCategory,
    package: selectedPackage,
    packageFromProvidedVehicle = {},
  } = model
  const {
    packageCategory: packageCategoryFromProvidedVehicle,
    package: selectedPackageFromProvidedVehicle,
  } = packageFromProvidedVehicle
  let selectedPackageId
  let selectedPackageIdFromProvidedVehicle
  if (isEdit) {
    const { package: providedVehiclePackage } = packageFromProvidedVehicle
    // eslint-disable-next-line no-underscore-dangle
    selectedPackageId = selectedPackage._id || selectedPackage
    // eslint-disable-next-line no-underscore-dangle
    selectedPackageIdFromProvidedVehicle = (providedVehiclePackage && providedVehiclePackage._id) || providedVehiclePackage
  } else {
    selectedPackageId = selectedPackage
    selectedPackageIdFromProvidedVehicle = selectedPackageFromProvidedVehicle
  }
  const options = {
    stateKey: 'packages',
    category: packageCategory,
    recordId: selectedPackageId,
  }
  const providedVehicleOptions = {
    stateKey: 'packages',
    category: packageCategoryFromProvidedVehicle,
    recordId: selectedPackageIdFromProvidedVehicle,
  }
  const packageDetails = getDataItemById(state, options) || {}
  const providedVehiclePackageDetails = getDataItemById(state, providedVehicleOptions) || {}
  const { name } = getConfigCategoryById(state, 'vehicleCategory', vehicleCategory) || {}
  return {
    packageDetails,
    providedVehiclePackageDetails,
    vehicleProvided: name,
  }
}

export {
  mapStateToProps,
}
