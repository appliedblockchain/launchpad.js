FROM grafana/grafana:latest

ADD ./monitoring/grafana/datasources /etc/grafana/provisioning/datasources/
ADD ./monitoring/grafana/dashboards /etc/grafana/dashboards/
ADD ./monitoring/grafana/conf/default_dashboard.yml /etc/grafana/provisioning/dashboards/

ENV GF_SECURITY_ADMIN_PASSWORD=password\
    GF_SECURITY_ADMIN_USER=admin\
    GF_PATHS_PROVISIONING=/etc/grafana/provisioning/
