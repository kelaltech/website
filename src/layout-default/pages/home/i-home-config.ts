import { IntroProps } from '../../components/intro/intro-props'
import { PromosProps } from '../../components/promos/promos-props'
import { OurSolutionsProps } from '../../components/our-solutions/our-solutions-props'
import { TheCompanyProps } from '../../components/the-company/the-company-props'
import { ContactUsProps } from '../../components/contact-us/contact-us-props'

export type IHomeConfig = {
  components: (
    | { type: 'intro'; props: IntroProps }
    | { type: 'promos'; props: PromosProps }
    | { type: 'solutions'; props: OurSolutionsProps }
    | { type: 'company'; props: TheCompanyProps }
    | { type: 'contact'; props: ContactUsProps })[]
}
