import accounting from '../assets/accounting.jpg'
import humanResources from '../assets/humanResources.jpg'
import customerService from '../assets/customerService.jpg'
import marketing from '../assets/marketing.jpg'
import researchDevelopment from '../assets/researchDevelopment.jpg'
import production from '../assets/production.jpg'

const departments = {
  Accounting: {
    color: 'blue',
    imageURL: accounting,
    rgba: 'rgba(33, 133, 208, 0.7)',
    hex: '#2185D0'
  },
  'Human Resources': {
    color: 'green',
    imageURL: humanResources,
    rgba: 'rgba(33, 186, 69, 0.7)',
    hex: '#21BA45'
  },
  'Customer Service': {
    color: 'yellow',
    imageURL: customerService,
    rgba: 'rgba(251, 189, 8, 0.7)',
    hex: '#FBBD08'
  },
  Marketing: {
    color: 'orange',
    imageURL: marketing,
    rgba: 'rgba(242, 113, 28, 0.7)',
    hex: '#F2711C'
  },
  'Research & Development': {
    color: 'purple',
    imageURL: researchDevelopment,
    rgba: 'rgba(163, 51, 200, 0.7)',
    hex: '#A333C8'
  },
  Production: {
    color: 'pink',
    imageURL: production,
    rgba: 'rgba(224, 57, 151, 0.7)',
    hex: '#E03997'
  }
}

export default departments
