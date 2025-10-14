import React, { useState, useEffect } from "react";
import styles from "./ManagerUser.module.scss";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../components/Pagination/Pagination";
import authService from "../../../service/authServices";
import type { User } from "../../../utils/types";

type UserUI = User & {
  name: string;
  username: string;
  status: string;
};

export default function ManagerUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserUI[]>([]);
  const [loading, setLoading] = useState(true);

  const usersPerPage = 1;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await authService.getAll();

        const formattedUsers = data
          .map((u) => ({
            ...u,
            name: `${u.firstName} ${u.lastName}`,
            username: `@${u.firstName.toLowerCase()}`,
            status: "hoạt động",
          }))
          .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

        setUsers(formattedUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  useEffect(() => {
    const totalPagesNow = Math.ceil(filteredUsers.length / usersPerPage);
    if (currentPage > totalPagesNow && totalPagesNow > 0) {
      setCurrentPage(totalPagesNow);
    }
  }, [filteredUsers, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const displayedUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div className={styles.main}>
      <div className={styles.topBar}>
        <h2>
          Team members{" "}
          <span className={styles.count}>{filteredUsers.length} users</span>
        </h2>

        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p>Không có người dùng nào</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Email address</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    <div>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.username}>{user.username}</p>
                    </div>
                  </div>
                </td>
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>
                  <div className={styles.activeBox}>
                    <span className={styles.actionBlock}>block</span>
                    <span className={styles.actionUnblock}>unblock</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className={styles.boxPagi}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}
