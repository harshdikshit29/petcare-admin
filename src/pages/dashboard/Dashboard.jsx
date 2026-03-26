import StatsCard from "../../components/dashboard/StatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your product usage and licenses
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clinics"
          value="128"
          description="All registered clinics"
        />
        <StatsCard
          title="Active Licenses"
          value="96"
          description="Currently active subscriptions"
        />
        <StatsCard
          title="Trials Running"
          value="21"
          description="Clinics in trial period"
        />
        <StatsCard
          title="Expired / Paused"
          value="11"
          description="Licenses needing attention"
        />
      </div>
    </div>
  );
};

export default Dashboard;
