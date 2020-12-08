import { ContactUsProps } from '../../components/contact-us/contact-us-props'
import { IntroProps } from '../../components/intro/intro-props'
import { OurPartnersProps } from '../../components/our-partners/our-partners-props'
import { OurSolutionsProps } from '../../components/our-solutions/our-solutions-props'
import { PromosProps } from '../../components/promos/promos-props'
import { TheCompanyProps } from '../../components/the-company/the-company-props'

export type IHomeConfig = {
  components: (
    | { type: 'intro'; props: IntroProps }
    | { type: 'promos'; props: PromosProps }
    | { type: 'solutions'; props: OurSolutionsProps }
    | { type: 'partners'; props: OurPartnersProps }
    | { type: 'company'; props: TheCompanyProps }
    | { type: 'contact'; props: ContactUsProps }
  )[]
}
