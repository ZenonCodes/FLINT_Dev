import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBankAccount } from 'app/shared/model/bank-account.model';
import { getEntities } from './bank-account.reducer';

export const BankAccount = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const bankAccountList = useAppSelector(state => state.bankAccount.entities);
  const loading = useAppSelector(state => state.bankAccount.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="bank-account-heading" data-cy="BankAccountHeading">
        <Translate contentKey="flintApp.bankAccount.home.title">Bank Accounts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="flintApp.bankAccount.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/bank-account/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="flintApp.bankAccount.home.createLabel">Create new Bank Account</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bankAccountList && bankAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="flintApp.bankAccount.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="flintApp.bankAccount.accountNumber">Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="flintApp.bankAccount.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="flintApp.bankAccount.balance">Balance</Translate>
                </th>
                <th>
                  <Translate contentKey="flintApp.bankAccount.accountType">Account Type</Translate>
                </th>
                <th>
                  <Translate contentKey="flintApp.bankAccount.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bankAccountList.map((bankAccount, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/bank-account/${bankAccount.id}`} color="link" size="sm">
                      {bankAccount.id}
                    </Button>
                  </td>
                  <td>{bankAccount.accountNumber}</td>
                  <td>{bankAccount.accountName}</td>
                  <td>{bankAccount.balance}</td>
                  <td>
                    <Translate contentKey={`flintApp.AccountType.${bankAccount.accountType}`} />
                  </td>
                  <td>{bankAccount.user ? bankAccount.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/bank-account/${bankAccount.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/bank-account/${bankAccount.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/bank-account/${bankAccount.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="flintApp.bankAccount.home.notFound">No Bank Accounts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BankAccount;