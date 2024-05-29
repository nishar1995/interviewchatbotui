import cn from '@/utils/class-names';
import MyTenant from './my-tenant';


interface IndexProps {
  className?: string;
}

export default function ExecutiveTenantDashboard({ className }: IndexProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7',
        className
      )}
    >

      {<MyTenant />}
      {/* { <StatsCards />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <RevenueExpense />
        <Forecast />
      </div>
      <TotalProfitLoss />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 @7xl:grid-cols-4 2xl:gap-x-6 2xl:gap-y-7">
        <MRRReport />
        <SocialFollowers />
        <WebAnalytics />
        <BiggestDeal />
      </div>
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <SalesByCategory />
        <MonthlySalesGrowth />
      </div>
      <OperatingCashFlow />
      <div className="grid grid-cols-1 gap-5 @4xl:grid-cols-2 2xl:gap-x-6 2xl:gap-y-7">
        <ArrBySignUp />
        <ActiveUsers />
      </div>
      <RecentCustomers /> } */}
    </div>
  );
}
